import React from 'react'

export const ForgotPassword = () => {
    const handleForgotPassword = () => {
        console.log("send a link to an user email")
    }
    return (
        <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
            <div className="row justify-content-sm-center mt-4 mb-5">
                <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
                    <div className="col-lg-12 mb-5">
                        <h2 className="mb-5">Recover Password</h2>
                        <div className="mt-1">
                            <p className="card-text "> We will send you a link to recover your password, please enter your email</p>
                            <div className="form-group mt-2">
                                <input type="text" placeholder="Email" className="form-control text-center"/>
                            </div>
                        </div>
                    </div>
                    <button onClick = {handleForgotPassword} type="button" className="btn btn-primary">Send me an email</button>
                </div>
            </div>
        </section>
    )
}