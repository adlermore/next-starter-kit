'use client'
import { useContext, useEffect, useState } from 'react'
import { Twirl as Hamburger } from 'hamburger-react'
import "@/styles/header.scss"
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import api from '@/utils/api';
import { JsonContext } from '@/context/JsonContext';

function Header() {
  const [isOpen, setOpen] = useState(false);
  const { contacts, setContacts } = useContext(JsonContext);

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1];

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/') || '/';
    router.replace(newPath);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      document.body.classList.remove('menu_opened');
      document.body.style.overflow = "visible";
    }
  }, [isOpen, pathname]);


  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    return
    async function getContacts() {
      try {
        const data = await api.get("/getContacts");
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
    if (!contacts) getContacts();
  }, []);

  return (
    <header className='header'>
      <div className='custom_container'>
        <div className='header_inner'>

          <div className='header_logo'>
            <Link href='/' className='z-20 mobile:mx-auto'>
              LOGO
            </Link>
          </div>

          <div className='menu_block desktop_menu flex-1'>
            <div className='flex gap-5 justify-end items-center '>
              <div className='lg_block flex gap-4'>
                <button
                  onClick={() => switchLocale('ru')}
                  className={currentLocale === 'ru' ? 'active' : ''}
                >
                  RU
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={currentLocale === 'en' ? 'active' : ''}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale('hy')}
                  className={currentLocale === 'hy' ? 'active' : ''}
                >
                  HY
                </button>
              </div>
            </div>

          </div>

          <div className="hamburger_block">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={22}
              direction='right'
              color="#000"
            />
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header
