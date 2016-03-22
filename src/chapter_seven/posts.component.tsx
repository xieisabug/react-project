/**
 * Created by Gene on 16/3/21.
 */

class PostsComponent extends React.Component<any, any> {
    render() {
        const { posts } = this.props;
        return (
            <ul>
                {posts.map((post, i) =>
                <li key={i}>{post.title}</li>
                    )}
            </ul>
        )
    }
}

export default PostsComponent;
