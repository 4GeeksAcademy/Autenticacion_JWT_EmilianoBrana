import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 d-flex justify-content-center">
			<div className="row">
			<h1 className="text-center mt-5 d-flex justify-content-center">Login here</h1>
			<form>
				{/* <!-- Email input --> */}
				<div data-mdb-input-init class="form-outline mb-4">
					<input type="email" id="form2Example1" class="form-control" />
					<label class="form-label" for="form2Example1">Email address</label>
				</div>

				{/* <!-- Password input --> */}
				<div data-mdb-input-init class="form-outline mb-4">
					<input type="password" id="form2Example2" class="form-control" />
					<label class="form-label" for="form2Example2">Password</label>
				</div>

				{/* <!-- 2 column grid layout for inline styling --> */}
				<div class="row mb-4">
					<div class="col d-flex justify-content-center">
						{/* <!-- Checkbox --> */}
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
							<label class="form-check-label" for="form2Example31"> Remember me </label>
						</div>
					</div>

					<div class="col">
						{/* <!-- Simple link --> */}
						<a href="#!">Forgot password?</a>
					</div>
				</div>

				{/* <!-- Submit button --> */}
				<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Log in</button>

				{/* <!-- Register buttons --> */}
				<div class="text-center">
					<p>Not a member? <Link to="/sigin"> Sign up</Link></p> 
					<p>or sign up with:</p>
					<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
						<i class="fab fa-facebook-f"></i>
					</button>

					<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
						<i class="fab fa-google"></i>
					</button>

					<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
						<i class="fab fa-twitter"></i>
					</button>

					<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
						<i class="fab fa-github"></i>
					</button>
				</div>
			</form>
			</div>
		</div>
	);
};
