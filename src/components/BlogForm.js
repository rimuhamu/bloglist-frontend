const BlogForm = ({ author, title, url, handleAuthorChange, handleTitleChange, handleUrlChange, handleSubmit }) => {
    return (
        <>
            <h2> Create a new blog</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <h3>add new blog</h3>
                    author
                    <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
                </div>
                <div>
                    title
                    <input type="text" value={title} name="Title" onChange={handleTitleChange} />
                </div>
                <div>
                    url
                    <input type="text" value={url} name="Url" onChange={handleUrlChange} />
                </div>

                <button type="submit">save</button>
            </form>
        </>
    )


}

export default BlogForm