import { Dropdown, Space } from "antd";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { HomeOutlined, MenuOutlined , ReadOutlined , FileTextOutlined , GroupOutlined, UnorderedListOutlined , UserOutlined } from '@ant-design/icons';

const AppLayout = () => {
    const location = useLocation()

    const items = [
        {
            label: <Link to=''>
                        <div  className={location.pathname === '/' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                            <HomeOutlined /> ACCUEIL
                        </div>
                    </Link>,
            key: '01'
        },
        {
            label: <Link to='etudiant'>
                    <div className={location.pathname === '/etudiant' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                        <UserOutlined /> ETUDIANT
                    </div>
                </Link>,
            key: '1'
        },
        {
            label: <Link to='note'>
                <div className={location.pathname === '/note' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                    <FileTextOutlined /> NOTE
                </div>
                </Link>,
            key: '3'
        },
        {
            label: <Link to='ue'>
                <div className={location.pathname === '/ue' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                    <GroupOutlined /> UE
                </div>
                </Link>,
            key: '4'
        },
        {
            label: <Link  to='ec'>
                <div className={location.pathname === '/ec' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                    <ReadOutlined /> EC
                </div>
                </Link>,
            key: '6'
        },
        {
            label: <Link  to='niveau'>
                <div className={location.pathname === '/niveau' ? 'text-primary px-4 py-1' : 'px-4 py-1'}>
                    <UnorderedListOutlined /> NIVEAU
                </div>
                </Link>,
            key: '6'
        },

    ];

    return(
        <div className="w-full">
            <div className="w-full fixed px-5 h-14 bg-primary z-50 text-white flex justify-between items-center  font-lato">
                <Link to=''>
                    <p className="text-2xl font-bold hover:animate-pulse">LMD</p>
                </Link>
                <div className="md:flex items-center hidden md:visible">
                    <Link to='' className="mx-1 p-1 hover:scale-105 hover:text-opacity-100  transition duration-300">
                        <div  className={location.pathname === '/' ? 'text-four' : ''}>
                            <HomeOutlined /> Accueil
                        </div>
                    </Link>
                    <Link to='etudiant' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/etudiant' ? 'text-four' : ''}>
                            <UserOutlined /> Etudiant
                        </div>
                    </Link>
                    <Link to='note' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/note' ? 'text-four' : ''}>
                            <FileTextOutlined /> Note
                        </div>
                    </Link>
                    <Link to='ue' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/ue' ? 'text-four' : ''}>
                            <GroupOutlined /> UE
                        </div>
                    </Link>
                    <Link to='ec' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/ec' ? 'text-four' : ''}>
                            <ReadOutlined /> EC
                        </div>
                    </Link>
                    <Link to='niveau' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/niveau' ? 'text-four' : ''}>
                            <UnorderedListOutlined /> Niveau
                        </div>
                    </Link>
                </div>
                <Dropdown className="visible md:hidden" menu={{items}} trigger={['click']}>
                    <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                        <Space>
                            <MenuOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <Outlet />
        </div>
    )
}

export default AppLayout;