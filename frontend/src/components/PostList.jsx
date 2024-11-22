import React, { useEffect, useState } from 'react';
import PostService from '../service/PostService';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [hasMore, setHasMore] = useState(true);

    const fetchPost = async () => {
        const response = await PostService.getList();
        setPosts(response);
        if (response.length <= visiblePosts) {
            setHasMore(false);
        }
    };

    useEffect(() => { 
        fetchPost();
    }, []);

    const handleScroll = (e) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.target;
        if (scrollLeft + clientWidth >= scrollWidth - 5 && hasMore) {
            if (visiblePosts + 3 >= posts.length) {
                setVisiblePosts(posts.length);
                setHasMore(false);
            } else {
                setVisiblePosts(prev => prev + 3);
            }
        }
    };

    return (
        <div className="post-list bg-gray-100 p-6 rounded-lg shadow-md max-w-screen-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Posts</h2>
            <div 
                className="horizontal-scroll flex space-x-6 overflow-x-auto scrollbar-hide" 
                onScroll={handleScroll} 
                style={{ whiteSpace: 'nowrap', paddingBottom: '1rem' }}
            >
                {posts.slice(0, visiblePosts).map(post => (
                    <div 
                        key={post.id} 
                        className="inline-block w-80 bg-white rounded-lg shadow-lg overflow-hidden"
                        style={{ minWidth: '300px' }}
                    >
                        <img 
                            src={`http://localhost:8000/api/post/${post.id}/image`} 
                            alt={post.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                            <button className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-600">
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {!hasMore && (
                <p className="text-gray-600 text-center mt-4">No more posts available.</p>
            )}
        </div>
    );
}

export default PostList;
