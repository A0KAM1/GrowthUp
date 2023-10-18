import "./User.css"
import edit from "./assets/edit.svg"


function User(){
    return(
        <>
            <div className="content">
                <div className="title">
                    <h2>Informações pessoais</h2>
                    <button><img src={edit} /></button>
                </div>
                <label>Nome Completo</label>
                <input type="text" value="Nome" />
                <label>Email</label>
                <input type="text" value="user@name.com.br"/>
                <label>Senha</label>
                <input type="password" value="12345678"/>
            </div>
        </>
    )
}

export default User