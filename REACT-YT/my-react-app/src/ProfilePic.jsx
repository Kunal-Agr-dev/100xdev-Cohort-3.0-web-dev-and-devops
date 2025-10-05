
function ProfilePic(){
    const imageUrl = "https://jamesjguild.com/blog/2019/5/17/dexter-good-show-trying-to-be-bad";
    
    const handleImage = (e) => e.target.style.display = "none";

    return(<img onClick={(e) => handleImage(e)} src={imageUrl}></img>);
}

export default ProfilePic