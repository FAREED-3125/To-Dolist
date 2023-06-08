const Footer = () => {
    const year=new Date();
    return ( 
        <div className="footer">
            <p>Copyright <span style={{color:"red"}}>&copy;</span> {year.getFullYear()}</p>
        </div>
     );
}
 
export default Footer;