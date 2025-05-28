import React from 'react'
import { useNavigate } from 'react-router-dom'

const PreviewPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full bg-white">
      {/* 预览页面头部 */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Document Preview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Editor
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Export PDF
          </button>
        </div>
      </div>

      {/* 预览内容区域 */}
      <div className="overflow-auto h-[calc(100%-73px)]">
        <div className="max-w-4xl mx-auto py-8 px-6">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Data Governance Document
            </h2>
            
            {/* 这里放置实际的预览内容 */}
            <div className="prose max-w-none">
              <p className="text-gray-600">
                
              </p>
              <p className="text-gray-600 mt-4">
                
              </p>
              
              {/* 示例内容 */}
              <h3 className="text-lg font-semibold mt-6 mb-3">1. Introduction</h3>
              <p className="text-gray-600">
                
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2. Data Classification</h3>
              <p className="text-gray-600">
                
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">3. Access Control</h3>
              <p className="text-gray-600">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage 