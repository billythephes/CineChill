interface NavItem {
  id: number;
  route: string;
  name: string;
}

export const nav1: NavItem[] = [
  {
    id: 1,
    route: "/tv-shows",
    name: "TV-Shows"
  },
  {
    id: 2,
    route: "/phim-le",
    name: "Phim lẻ"
  },
  {
    id: 3,
    route: "/phim-bo",
    name: "Phim bộ"
  },
  {
    id: 4,
    route: "/phim-dang-chieu",
    name: "Phim đang chiếu"
  },
];

export const nav2: NavItem[] = [
  {
    id: 1,
    route: "/the-loai",
    name: "Thể loại"
  },
  {
    id: 2,
    route: "/quoc-gia",
    name: "Quốc gia"
  },
  {
    id: 3,
    route: "/nam-phat-hanh",
    name: "Năm"
  }
]