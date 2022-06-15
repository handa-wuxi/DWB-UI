export interface Menu {
  id: number;
  icon: string;
  link: string;
  memo: string; // 备注
  locale: string; // 名称
  menucode: string; // 菜单编码
  pid: number; // 父级id
  sort: number; // 排序
  submenu: Menu[]; // 子菜单
}

export interface User {
  id: number;
  empid: string; // 员工编号
  empname: string; // 员工姓名
  createon: string; // 创建时间
  state: number; // 状态
  updateon: string; // 更新时间
  username: string; // 用户名
}

export interface Role {
  id: number;
  roleName: string; // 角色名称
  state: number; // 状态 0禁用 1启用
  updateon: string; // 更新时间
  createon: string; // 创建时间
}
