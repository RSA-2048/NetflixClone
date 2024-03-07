

const BillBoardImage=(props:{image:string})=> {
    const imageStyle = {
        width: '100%',
        height: '100%',
        maskImage: 'linear-gradient(black, transparent)',
        WebkitMaskImage: 'linear-gradient(black, transparent)',
      };
    
  return (
    <>
        <img   className="w-full h-full object-cover" style={imageStyle} src={props.image.toString()} alt="Thumbnail" />
    </>
  )
}

export default BillBoardImage