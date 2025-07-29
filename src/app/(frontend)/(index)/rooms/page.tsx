import Loader from '@/components/loader'
import RoomsList from '@/components/rooms-list'
import { Suspense } from 'react'

const RoomsPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-4 px-4 md:px-0">
      <RoomsList showPagination={true} showSearch={true} />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <RoomsPage />
    </Suspense>
  )
}
