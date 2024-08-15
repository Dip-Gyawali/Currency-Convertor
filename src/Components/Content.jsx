export default function Content() {
    return (
        <>
            <div className="home">
                <h1 className="heading">Currency Convertor</h1><hr />
                <div className="convert-sec">
                    <div className="from-sec">
                        <h1 className="from-head">From :</h1>
                        <select className="drop-down">
                            <option value="USD" selected>USD</option>
                            <option value="NPR">NPR</option>
                            <option value="INR">INR</option>
                        </select>
                        <div className="conversion">
                            <img src="https://flagsapi.com/US/flat/64.png" alt="flag" />
                            <input type="number" placeholder="Enter Price" required />
                        </div>
                    </div>
                    <div className="to-sec">
                        <h1 className="to-head">To :</h1>
                        <select className="drop-down">
                            <option value="USD">USD</option>
                            <option value="NPR" selected>NPR</option>
                            <option value="INR">INR</option>
                        </select>
                        <div className="conversion">
                            <img src="https://flagsapi.com/IN/flat/64.png" alt="flag" />
                            <h1 className="result">400</h1>
                        </div>
                    </div>
                </div>
                <div className="btn-sec">
                    <button>Convert</button>
                </div>
            </div>
        </>
    );
}