import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';

const EditProfile = () => {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [currentOtpType, setCurrentOtpType] = useState('');
  const [openGenderDropdown, setOpenGenderDropdown] = useState(false);
  const [genderOptions] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Not Preferable to Say', value: 'not_preferable' },
  ]);
  const [avatar, setAvatar] = useState(null);

  const handleSendOtp = (type) => {
    setCurrentOtpType(type);
    setOtpModalVisible(true);
  };

  const handleOtpSubmit = () => {
    Alert.alert('OTP Verified', `Your ${currentOtpType} has been verified successfully.`);
    setOtpModalVisible(false);
  };

  const handleSave = () => {
    console.log({ mobile, email, gender, dob, bio });
  };

  const formatDob = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/^(\d{2})(\d{2})?(\d{4})?$/, (match, p1, p2, p3) => {
      if (p3) return `${p1}/${p2}/${p3}`;
      if (p2) return `${p1}/${p2}`;
      return p1;
    });
    setDob(formatted);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={100}
          source={avatar ? { uri: avatar } : require('../../assets/welcome.jpg')}
        />
        <TouchableOpacity style={styles.editAvatarButton} onPress={pickImage}>
          <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name (Uneditable)</Text>
          <TextInput
            style={[styles.input, styles.uneditableInput]}
            value="John Doe"
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Enter your mobile number"
              value={mobile}
              onChangeText={setMobile}
            />
            <TouchableOpacity
              style={[styles.otpButton, styles.flexButton]}
              onPress={() => handleSendOtp('mobile')}
            >
              <Text style={styles.otpButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[styles.otpButton, styles.flexButton]}
              onPress={() => handleSendOtp('email')}
            >
              <Text style={styles.otpButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <DropDownPicker
            open={openGenderDropdown}
            value={gender}
            items={genderOptions}
            setOpen={setOpenGenderDropdown}
            setValue={setGender}
            style={styles.dropdown}
            placeholder="Select your gender"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your DOB (DD/MM/YYYY)"
            value={dob}
            onChangeText={formatDob}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal */}
      <Modal
        transparent={true}
        visible={otpModalVisible}
        animationType="slide"
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="Enter 6-digit OTP"
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleOtpSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 8,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  uneditableInput: {
    backgroundColor: '#e9ecef',
  },
  bioInput: {
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexInput: {
    flex: 1,
    marginRight: 8,
  },
  flexButton: {
    flexBasis: '30%',
  },
  otpButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default EditProfile;
