const Avatar = ({ src }) => {
    return (
        <div className="block w-11 h-11 rounded-3xl overflow-hidden">
            <img className="w-full h-full" src={src} alt="profile photo" />
        </div>
    )
}

export default Avatar