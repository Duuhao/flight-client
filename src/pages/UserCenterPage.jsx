import { Link } from 'react-router-dom'

export default function UserCenterPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">用户中心</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">个人信息</h2>
          <div className="space-y-3">
            <p><span className="font-medium">用户名:</span> 张三</p>
            <p><span className="font-medium">邮箱:</span> user@example.com</p>
            <p><span className="font-medium">会员等级:</span> 普通会员</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">账户安全</h2>
          <div className="space-y-3">
            <Link to="/change-password" className="block text-blue-500 hover:text-blue-700">修改密码</Link>
            <Link to="/update-email" className="block text-blue-500 hover:text-blue-700">更换邮箱</Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">快捷操作</h2>
          <div className="space-y-3">
            <Link to="/book" className="block text-blue-500 hover:text-blue-700">预定机票</Link>
            <Link to="/my-trips" className="block text-blue-500 hover:text-blue-700">我的行程</Link>
            <Link to="/my-bookings" className="block text-blue-500 hover:text-blue-700">我的订单</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
