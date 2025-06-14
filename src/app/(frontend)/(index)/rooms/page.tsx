import RoomsList from '@/components/rooms-list'



const RoomsPage = () => {
  return (
    <div className='max-w-7xl mx-auto py-4'>
      <RoomsList showPagination={true} showSearch={true} />
    </div>
  )
}

export default RoomsPage
