import { useNavigate } from "react-router-dom"
import tennant from '../assets/error.gif'

function Error() {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-blue" style={{ height: '100vh', width: '100vw', padding: '30px', display: 'flex', flexFlow: 'column', justifyContent: 'space-around' }}>
                <div>
                    <ion-icon name="skull-outline" style={{ fontSize: '5rem' }}></ion-icon>
                    <h2>Erro! Usuário ou senhas incorretos...</h2>
                </div>
                <img src={tennant} />
                <button style={{ margin: '0 auto', display: 'block', width: '100%', backgroundColor: '#279EFF', color: 'white', height: '45px', borderRadius: '6px', fontSize: '1.125rem' }} onClick={() => navigate("/")}>Voltar</button>
            </div>
        </>
    )

}
export default Error