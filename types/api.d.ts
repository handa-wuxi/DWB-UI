export interface SystemMenu {
  id: number;
  link: string;
  memo: string; // 备注
  locale: string; // 名称
  menucode: string; // 菜单编码
  icon: string;
  pid: number; // 父级id
  sort: number; // 排序
  submenus: SystemMenu[]; // 子菜单
}

export interface Menu {
  id: number;
  menucode: string; // 菜单编码
  label: string;
  key: string | number;
  icon?: () => VNode<RendererNode, RendererElement, { [ key: string ]: any; }>;
  children?: Menu[];
}

export interface User {
  id: number;
  empid: string; // 员工编号
  empname: string; // 员工姓名
  roles: string; // 角色
  createon: string; // 创建时间
  state: number; // 状态
  updateon: string; // 更新时间
  username: string; // 用户名
}

export interface Role {
  id: number;
  rolename: string; // 角色名称
  state: number; // 状态 0禁用 1启用
  updateon: string; // 更新时间
  createon: string; // 创建时间
}

export interface Login{
  id: number;
  username: string; // 用户名
  empname: string; // 员工姓名
  empid: string; // 员工编号
  token: string; // token
}

export interface MenuFunc {
  id: number;
  funccode: string; // 功能编号
  memo: string; // 备注
}
