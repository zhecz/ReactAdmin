const menuList = [
  {
    title: 'Dashboard', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: 'Product',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: 'Category Management',
        key: '/category',
        icon: 'bars'
      },
      {
        title: 'Product Management',
        key: '/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: 'User Management',
    key: '/user',
    icon: 'user'
  },
  {
    title: 'Role Management',
    key: '/role',
    icon: 'safety',
  },

  {
    title: 'Charts',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: 'Bar Chart',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: 'Line Chart',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: 'Pie Chart',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: 'Order Management',
    key: '/order',
    icon: 'windows',
  },
]

export default menuList