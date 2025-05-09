const Topbar = () => {
  return (
   <>
      <div className="container sm-none">
      <div className="py-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-normal family-poppins text-green top-info">Personal</span>
            <span className="text-sm font-normal family-poppins text-white px-5">For Business</span>
          </div>
          <div style={{width : '35%'}}>
            <span className="text-sm font-normal family-poppins text-white top-info">How It Works</span>
            <span className="text-sm font-normal family-poppins text-white top-info">Resources</span>
            <span className="text-sm font-normal family-poppins text-white top-info">Blog</span>
            <span className="text-sm font-normal family-poppins text-white top-info">Join Our Team</span>
            <span className="text-sm font-normal family-poppins text-white inline-flex px-3 language"><img src="/images/logo/language.svg" /></span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-black web-none">
      <div className="container ">
      <div className="py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-center w-full">
            <span className="text-sm font-normal family-poppins text-green top-info">Personal</span>
            <span className="text-sm font-normal family-poppins text-white px-5">For Business</span>
          </div>
        </div>
      </div>
    </div>
    </div>
   </>
  )
}

export default Topbar;
