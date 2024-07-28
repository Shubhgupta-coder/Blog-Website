import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => 
    state.auth.status); //state.auth islie kyuki hamara jo slice h uska namae auth h
  

  const navigate = useNavigate();
  // This is a very common syntax in production app. yaha pr hm bss wo wo item show krenge jo ki active or wo hamara authstatus pr depend keta h
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) =>
              // agar item active nikla to m kuch dispaly krwana chahta hoo li m
              item.active ? (
                <li key={item.name}>
                  {/* yha p jaisi hm buttom pr clich=k krte h to hm item.slug jo ki ek link h wha pr redirect ho jaenge */}
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* iski mtlb h agr authstatus true h to hi hamari bracket wali xheez execute  hogi other wise nhi */}
            {/* mtlb agr authenticated ho to hi logout btn lo otherwise nhi */}
            {authStatus && (
            <li>
               <LogoutBtn/>
            </li>
        )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
