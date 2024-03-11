import styles from "./styles.module.css";

function Login() {
	const googleAuth = () => {
		
		window.open(
			`http://localhost:8080/auth/google/login`,
			"_self"
		);
	};
	return (
		<div className={styles.maincontainer}>
        <div className={styles.container}>
            <div className={styles.ring}>
                <i style={{'--clr': '#00ff0a'}}></i>
                <i style={{'--clr': '#ff0057'}}></i>
                <i style={{'--clr': '#fffd44'}}></i>
            </div>
            <div className={styles.login}>
                <h2>LOGIN</h2>
                <div className={styles.inputBx}>
                    <button className={styles.submitBtn} onClick={googleAuth}>Sign In</button>
                </div>
            </div>
        </div>
		</div>
    );
}

export default Login;
