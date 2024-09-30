import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Button, Input, Typography, Select, MenuItem } from '@harshitpadha/themes';
import { fetchLoggedInUser, updateLoggedInUser } from '../../../../api/admin';
import DefaultAvatar from '../../../../assets/default_avatar.png'; // Add a default avatar image

const CurrentUserProfile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '', // Phone number field
        countryCode: '+91', // Default country code
    });
    const [error, setError] = useState(''); // Error message state

    // List of country codes (can be extended)
    const countryCodes = [
        { code: '+1', name: 'United States' },
        { code: '+91', name: 'India' },
        { code: '+44', name: 'United Kingdom' },
        { code: '+61', name: 'Australia' },
        // Add more country codes as needed
    ];

    useEffect(() => {
        // Fetch logged-in user data, including phone number
        fetchLoggedInUser()
            .then((response) => {
                setUser(response.data);
                const phoneParts = splitPhoneNumber(response.data.phone_number);
                setFormData({
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    phone: phoneParts.phone || '', // Initialize phone number
                    countryCode: phoneParts.countryCode || '+91', // Initialize country code
                });
            })
            .catch((error) => {
                setError('Failed to fetch user data. Please try again later.');
            });
    }, []);

    const splitPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return { countryCode: '+91', phone: '' }; // Default to India if no phone number

        const match = phoneNumber.match(/^(\+\d{1,3})(\d+)$/);
        if (match) {
            return {
                countryCode: match[1],
                phone: match[2],
            };
        }

        return { countryCode: '+91', phone: phoneNumber }; // Default country code if no match
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (!/^\d+$/.test(formData.phone)) {
            setError('Phone number must contain only digits.');
            return;
        }

        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.countryCode + formData.phone, // Combine country code and phone number
        };

        updateLoggedInUser(payload)
            .then((response) => {
                setUser({ ...user, ...response.data });
                setIsEditing(false);
                setError(''); // Clear any previous errors
            })
            .catch((error) => {
                setError("User with email already exists or there might be a network error. Try Again!"); // Display error
            });
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <Grid container spacing={4} style={styles.gridContainer}>
                        <Grid item xs={12} md={12} style={styles.profileSection}>
                            <div style={styles.avatarWrapper}>
                                <img
                                    src={user.profile_photo || DefaultAvatar} // Use default avatar if no profile photo
                                    alt="Profile"
                                    style={styles.avatar}
                                />
                            </div>
                            <div style={styles.userInfoContainer}>
                                <h2 style={styles.userName}>
                                    {user.first_name} {user.last_name}
                                </h2>
                                <p style={styles.userEmail}>{user.email}</p>
                                <p style={styles.userPhone}>
                                    {formData.countryCode} {formData.phone || 'No phone number provided'}
                                </p>
                                <Button onClick={handleEditToggle} style={styles.editButton}>
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </Button>
                            </div>
                        </Grid>

                        {isEditing && (
                            <Grid item xs={12} md={12}>
                                <div style={styles.editForm}>
                                    <h3 style={styles.sectionTitle}>Edit Your Profile</h3>
                                    <Input
                                        label="First Name"
                                        value={formData.firstName}
                                        name="firstName"
                                        onChange={handleInputChange}
                                        placeholder="Enter your first name here"
                                        style={styles.inputField}
                                    />
                                    <Input
                                        label="Last Name"
                                        value={formData.lastName}
                                        name="lastName"
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name here"
                                        style={styles.inputField}
                                    />
                                    <Input
                                        label="Email"
                                        value={formData.email}
                                        name="email"
                                        onChange={handleInputChange}
                                        placeholder="Enter your email here"
                                        style={styles.inputField}
                                    />
                                    <div style={styles.phoneContainer}>
                                        <Select
                                            value={formData.countryCode}
                                            onChange={(e) => handleInputChange({ target: { name: 'countryCode', value: e.target.value } })}
                                            style={styles.countryCodeSelect}
                                        >
                                            {countryCodes.map((country) => (
                                                <MenuItem key={country.code} value={country.code}>
                                                    {country.name} ({country.code})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Input
                                            label="Phone Number"
                                            value={formData.phone}
                                            name="phone"
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            style={styles.phoneInputField}
                                        />
                                    </div>
                                    {error && (
                                        <Typography style={styles.errorText}>
                                            {error}
                                        </Typography>
                                    )}
                                    <Button onClick={handleSave} style={styles.saveButton}>
                                        Save Changes
                                    </Button>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

// Updated styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
    },
    avatarWrapper: {
        margin: '0 auto',
        marginBottom: '20px',
        width: '150px',
        height: '150px',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 1)',
        border: '1px solid',
    },
    userInfoContainer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column', // Stacks name, email, and phone vertically
        alignItems: 'center', // Centers name, email, and phone horizontally
    },
    userName: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: '1.2rem',
        marginTop: '10px',
        color: '#aaa',
    },
    userPhone: {
        fontSize: '1.2rem',
        marginTop: '10px',
        color: '#aaa',
    },
    editButton: {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    saveButton: {
        marginTop: '20px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    phoneContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    countryCodeSelect: {
        width: '150px',
    },
    phoneInputField: {
        flex: 1,
    },
    errorText: {
        color: 'red',
        marginTop: '10px',
        fontSize: '1rem',
    },
};

export default CurrentUserProfile;
