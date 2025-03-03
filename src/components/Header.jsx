import Button from './Buttons';
import Logo from '../assets/logo.svg'
function Header() {
    return (
        <>
            <div className="header py-6">
                <div className='container'>
                    <div className='grid justify-between gap-2 grid-cols-2'>
                        <div className="header-logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="header-btn text-end">
                            <Button as="a" href="#" target="_blank" variant="secondary">
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;