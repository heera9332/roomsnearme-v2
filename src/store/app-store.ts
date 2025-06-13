import { Post, Room } from '@/payload-types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axios } from '@/lib/axios'

interface AppState {
  posts: (Post & { liked?: boolean; likes?: number })[]
  rooms: Room[]

  loadingPosts: boolean
  loadingRooms: boolean

  loadRooms: () => Promise<void>
  getRoom: (id: string) => Room | null
  getPost: (id: string) => Post | null
  loadPosts: () => Promise<void>
  likePost: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      posts: [],
      rooms: [],
      loadingPosts: false,
      loadingRooms: false,

      getRoom(id) {
        const rooms1 = this.rooms.filter(room => room.id == id);
        return rooms1.length ? rooms1[0] : null;
      },

      getPost(id) {
        const rooms1 = this.posts.filter(post => post.id == id);
        return rooms1.length ? rooms1[0] : null;
      }, 

      // Load Rooms from API
      loadRooms: async () => {
        try {
          set({ loadingRooms: true })
          const res = await axios.get('/api/rooms')
          const data: Room[] = res.data?.docs || []
          set({ rooms: data })
        } catch (error) {
          console.log('failed to load rooms', error)
        } finally {
           set({ loadingRooms: false })
        }
      },

      // Load Posts from API
      loadPosts: async () => {
        try {
          set({ loadingPosts: true })
          const res = await axios.get('/api/posts')
          // You might want to persist `liked` and `likes` if server supports it.
          const data: (Post & { liked?: boolean; likes?: number })[] = res.data.docs
          set({ posts: data })
        } catch (error) {
          console.error('Failed to load posts:', error)
        } finally {
          set({ loadingPosts: false })
        }
      },

      // Like a post locally (for demo, UI feedback, not server-persisted)
      likePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  likes: typeof post.likes === 'number' ? post.likes + 1 : 1,
                  liked: true, // Local UI flag
                }
              : post,
          ),
        }))
        // For real server-side likes, you can:
        // await axios.post(`/api/posts/${id}/like`);
      },
    }),
    { name: 'rooms-app-storage' }
  )
)
