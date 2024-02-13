

export const ImagePreview = ({ image, name }) => {
  return (
    <div className="w-32 mt-2 h-32 p-2 bg-main rounded">
      <img src={ image ? image : '/images/user.jfif' } alt={ name } className='w-full h-full object-cover rounded' />
    </div>
  )
}