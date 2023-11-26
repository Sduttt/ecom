"use client";
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, User } from "@nextui-org/react";
import { useAuth } from "@/contextapi/AuthContext";
import { CategoryDropDown, Logout } from "@/components";
import Cookies from 'js-cookie';
import authService from '@/appwrite/auth';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, authLoading, userData } = useAuth();
  const uid = Cookies.get("uid")
  const pathname = usePathname();


  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navitem = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Used Books",
      link: "/used"
    }
  ]


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {
          navitem.map(item => (
            <NavbarItem key={item.name} >
              <Link href={item.link} className={pathname == item.link ? 'font-bold' : ''}>
                {item.name}
              </Link>
            </NavbarItem>
          )
          )
        }

        <NavbarItem>
          <CategoryDropDown />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {
          authLoading ? (
            <Button color="primary" isLoading>
              Loading
            </Button>
          ) : (
            <>
              {
                isAuthenticated ? (
                  <>
                    <div className="bg-gray-600 p-1 rounded-md">
                      <User
                        name={`${userData.name}`}
                        description={`${userData.email}`}
                        avatarProps={{
                          fallback: `${userData.name[0]}`,
                        }}
                      />
                    </div>
                    {
                      userData && userData.labels.includes("admin") ? (
                        <NavbarItem>
                          <Link href="/add-book">
                            <Button color="warning">Add Book</Button>
                          </Link>
                        </NavbarItem>
                      ) : ("")
                    }
                    <NavbarItem>
                      <Logout />
                    </NavbarItem>
                  </>
                ) : (
                  <>
                    <NavbarItem className="hidden lg:flex">
                      <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                      <Button as={Link} color="primary" href="/signup" variant="flat">
                        Sign Up
                      </Button>
                    </NavbarItem>
                  </>
                )
              }
            </>
          )
        }
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Nav





