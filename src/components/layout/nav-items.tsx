import { NavLinkItem, NavDropdownItem } from "@/shared/interfaces/INavItem";

export const navLink: NavLinkItem[] = [
  {
    id: 1,
    slug: "tv-shows",
    name: "TV Shows"
  },
  {
    id: 2,
    slug: "phim-le",
    name: "Phim Lẻ"
  },
  {
    id: 3,
    slug: "phim-bo",
    name: "Phim Bộ"
  },
  {
    id: 4,
    slug: "hoat-hinh",
    name: "Hoạt Hình"
  },
];

export const navDropdown: NavDropdownItem[] = [
  {
    id: 1,
    api: "https://phimapi.com/the-loai",
    slug: "the-loai",
    name: "Thể Loại"
  },
  {
    id: 2,
    api: "https://phimapi.com/quoc-gia",
    slug: "quoc-gia",
    name: "Quốc Gia"
  },
  {
    id: 3,
    api: "http://localhost:3000/api/nam-phat-hanh",
    slug: "nam",
    name: "Năm"
  },
]