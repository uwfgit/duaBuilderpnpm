import fdaLogo from '../assets/images/fda-logo-with-text.png'

const GlobalHeader = () => {
  return (
    <header className="bg-blue-950 text-white">
      <div className="px-4">
        <div className="flex items-center h-12">
          <div className="flex items-center space-x-3">
            <img 
              src={fdaLogo} 
              alt="U.S. FOOD & DRUG" 
              className="h-7 w-auto"
            />
            <span className="text-white font-bold text-base">Data Governance Document Builder</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader 