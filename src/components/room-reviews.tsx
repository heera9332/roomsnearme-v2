'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { axios } from '@/lib/axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from './ui/card' // adjust path if your exports differ
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'

type Reviewer = {
  name?: string
  username?: string
  email?: string
  id?: string
}

type Review = {
  id: string
  rating: number
  reviewText?: string
  createdAt: string
  user?: Reviewer
}

type ReviewsResponse = {
  docs: Review[]
  totalDocs: number
  page: number
  totalPages: number
}

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

const StarsDisplay = ({ rating }: { rating: number }) => {
  const filled = Math.floor(rating)
  const half = rating - filled >= 0.5
  const total = 5

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: total }).map((_, i) => {
        if (i < filled) {
          return <Star key={i} className="w-4 h-4 bg-yellow-500" />
        }
        if (i === filled && half) {
          return (
            <div key={i} className="relative w-4 h-4">
              <Star
                style={{ clipPath: 'inset(0 50% 0 0)' }}
                className="w-4 h-4 bg-yellow-500 absolute top-0 left-0"
              />
              <Star className="w-4 h-4 text-yellow-500/30" />
            </div>
          )
        }
        return <Star key={i} className="w-4 h-4 text-yellow-500/30" />
      })}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

export const RoomReviews = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchedOnce, setFetchedOnce] = useState(false)

  const getReviews = useCallback(async (roomId: string) => {
    setLoading(true)
    try {
      const res = await axios.get<ReviewsResponse>('/api/reviews', {
        params: {
          'where[room][equals]': roomId,
          depth: 1, // populate user
          sort: '-createdAt',
          limit: 20,
        },
      })
      setReviews(res.data.docs)
      setFetchedOnce(true)
    } catch (err) {
      console.error('Failed to fetch reviews', err)
      toast.error('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!id) return
    getReviews(id)
  }, [id, getReviews])

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <CardTitle className="text-2xl flex items-center gap-2">Reviews</CardTitle>
          <p className="text-sm text-gray-500">
            {reviews.length > 0
              ? `${reviews.length} review${reviews.length > 1 ? 's' : ''}`
              : fetchedOnce
              ? 'No reviews yet'
              : 'Loading...'}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="text-center py-6 text-sm text-gray-500">Loading reviews...</div>
        )}

        {!loading && reviews.length === 0 && fetchedOnce && (
          <div className="text-center py-6 text-sm text-gray-600">
            Be the first to review this room.
          </div>
        )}

        {!loading &&
          reviews.map((r) => (
            <Card
              key={r.id}
              className="border bg-white shadow-sm"
              data-review-id={r.id}
            >
              <CardContent className="space-y-2">
                <div className="flex items-start gap-4">
                  <Avatar>
                    {r.user?.name || r.user?.username ? (
                      <AvatarFallback>
                        {((r.user?.name || r.user?.username || 'U')[0] as string).toUpperCase()}
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback>?</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {r.user?.name || r.user?.username || 'Unknown'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {r.user?.email && `(${r.user.email})`}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(r.createdAt)}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <StarsDisplay rating={r.rating} />
                      </div>
                    </div>
                    {r.reviewText && (
                      <p className="mt-2 text-sm text-gray-700">{r.reviewText}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  )
}
