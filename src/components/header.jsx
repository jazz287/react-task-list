import "../styles/header.css";

function Header({title, itemCount}){
    return <div className="header">
        <div>
            <span>{title}</span>
            &emsp;
            <span>{itemCount} items</span>
        </div>
        <div>Due</div>
    </div>;
}

export default Header;