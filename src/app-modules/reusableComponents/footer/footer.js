import { useLocation, useNavigate } from "react-router-dom"

function Footer() {
    const location = useLocation()
    const navigate = useNavigate();
    const { pathname } = location;
    return <>
        <div class="card container-fluid">
            {pathname !== '/login' && <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="cursor-pointer nav-item"><a onClick={() => navigate('/dashboard')} class="nav-link px-2 text-muted">Dashboard</a></li>
                <li class="cursor-pointer nav-item"><a onClick={() => navigate('/dashboard')} class="nav-link px-2 text-muted">Documents</a></li>
                <li class="cursor-pointer nav-item"><a onClick={() => navigate('/staff/list')} class="nav-link px-2 text-muted">Staff</a></li>
                <li class="cursor-pointer nav-item"><a onClick={() => navigate('/add/document')} class="nav-link px-2 text-muted">Add Document</a></li>
                <li class="cursor-pointer nav-item"><a onClick={() => navigate('/add/staff')} class="nav-link px-2 text-muted">Add Staff</a></li>
                </ul>
                <p class="text-center text-muted">© 2024 Company, Inc</p>
            </footer>}
         </div>
    </>
}

export default Footer