import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Announcements = ({ userId }) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
    }, [userId]);

    const fetchAnnouncements = () => {
        if (!userId) {
            console.error('User ID not provided');
            return;
        }
        const formData = new FormData();
        formData.append('userId', userId);
        fetch('http://localhost/avocatConnect/avocatConnect/src/announcements.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setAnnouncements(data.announcements);
            } else {
                console.error('Error fetching announcements:', data.error);
            }
        })
        .catch(error => console.error('Error fetching announcements:', error));
    };

    return (
        <div className="insights">
            {announcements.map(announcement => (
                <div className="insight" key={announcement.announceID}>
                    <div className="heading">{announcement.title}</div>
                    <div className="number">
                        {announcement.description}
                        <div className="info">{announcement.publication_date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

Announcements.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Announcements;
