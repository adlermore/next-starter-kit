function PageLoader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[#281822] flex items-center justify-center z-99999'>
      <div className='flex flex-col items-center gap-10'>
        <span className="loader">
          LOGO
        </span>
        <span className='page_loader'></span>
      </div>
    </div>
  )
}

export default PageLoader