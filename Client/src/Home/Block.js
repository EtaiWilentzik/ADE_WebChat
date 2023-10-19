import { Register } from "../registeration/Register";
import { Login } from "../login/Login";
import { Link, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import "./Block.css";
import {currentUser} from "../index.js"


export function Block(props) {
  return (
    <>
      <div className="container cont">
        <div className="d-flex justify-content-center align-self-center col-md-8 col-lg-12">
          <div className="card" id="foo">
            <div className="card-body p-md-5">
              <div className="row justify-content-center" id="moo">
                {props.args === "login" && <Login />}
                {props.args === "register" && <Register />}
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 order-md-1">
                  <img src="./photo.jpeg" className="img-fluid img-thumbnail" alt="Sample image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
