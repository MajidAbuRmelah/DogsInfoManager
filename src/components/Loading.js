import '../css/Loading.css';

function Loading({isLoading = false}) {
    if (!isLoading) {
        return null;
    }
    return (
        <span className="loader"></span>
    );
}

export default Loading;