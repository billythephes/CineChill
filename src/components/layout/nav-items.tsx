interface NavLinkItem {
  id: number;
  route: string;
  name: string;
}

interface NavDropdownItem {
  id: number;
  api: string;
  name: string;
}

export const navLink: NavLinkItem[] = [
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

export const navDropdown: NavDropdownItem[] = [
  {
    id: 1,
    api: "https://phimapi.com/the-loai",
    name: "Thể loại"
  },
  {
    id: 2,
    api: "https://phimapi.com/quoc-gia",
    name: "Quốc gia"
  },
  {
    id: 3,
    api: "http://localhost:3000/api/nam-phat-hanh",
    name: "Năm"
  },
]