
export function Message(props) {
    let name1,name2;
    if (props.type==="left"){
        name1="d-flex justify-content-between mb-4";
        name2="d-flex align-items-start>"
    }
    else{
        name1="d-flex justify-content-between mb-4 right-message";
        name2="d-flex align-items-start flex-row-reverse"
    }

    const date = new Date(props.time);
    const options = {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    const displayTime = date.toLocaleString("en-US", options);

    return (
        <li className={name1}>
            <div className={name2}>
                <img
                    src={props.img}
                    alt="avatar"
                    className="rounded-circle me-3 shadow-1-strong photoschat"
                    /* move to css file */
                    style={{width: 75, height: 75}}
                />
                <div className="card">
                    {/* check here if there is any problem with the code */}
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{props.name}</p>
                        <p className="text-muted small mb-0">
                            <i className="far fa-clock"/> {displayTime}
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">{props.message}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}
