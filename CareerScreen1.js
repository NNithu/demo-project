import axios from 'axios';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';



const CareerScreen1 = ({navigation}) => {
  // State definition
  const [postName, setPostName] = useState('');
  const [postNameErr, setPostNameErr] = useState('');
  const [description, setDescription] = useState('');
  const [noOfPosts, setNoOfPosts] = useState('');
  const [noOfPostsErr, setNoOfPostsErr] = useState('');
  const [jobTypeErr, setJobTypeErr] = useState('');
  const dropdownData = [
    {label: 'Permanent', value: 'Permanent'},
    {label: 'Temporary', value: 'Temporary'},
  ];
  const [dropDownVal, setDropDownVal] = useState(null);

  // Alert Box
  const dataAlert = (header, data) => Alert.alert(header, data);

  // Synchronous call to backend
  function handleSubmit(e) {
    // var data = {
    //   postName: postName,
    //   description: description,
    //   postNo: parseInt(noOfPosts),
    //   postType: dropDownVal,
    // };
         //axios.post("http://localhost:64301/Careers",data).then(response=>dataAlert(response));
    e.preventDefault();

    // Validations
    setPostNameErr('');
    setNoOfPostsErr('');
    setJobTypeErr('');
    const regexAlphaNumeric = new RegExp('^[A-Za-z0-9 ]+$');
    const regexNumeric = new RegExp('^[0-9]+$');
    if(postName==='')
    {
        setPostNameErr('*Please enter Post Name');
          return;
    }
    else if(postName==='')
    {
      setPostNameErr('*Please enter Post Name');
    }
    else if (postName.length > 20) {
      setPostNameErr('*Max length is 20');
      return;
    } else if (!regexAlphaNumeric.test(postName)) {
      setPostNameErr('*Only alphanumeric values are allowed');
      return;
    } else if (!regexNumeric.test(noOfPosts)) {
      setNoOfPostsErr('*Only numeric value is allowed');
      return;
    }  else if(noOfPosts==='')
    {
        setNoOfPostsErr('*Please enter no of Vacancies');
      return;
    }else if (dropDownVal === '') {
        setJobTypeErr('*Please select a value');
        return;
    }
     else {
      
      // Create the request
      var data = {
        id:'',  
        postName:postName,
        description: description,
        //postNo: parseInt(noOfPosts),
        postNo: noOfPosts,
        postType: dropDownVal,
      };
      
      let requestBody = JSON.stringify(data);
      dataAlert('message', requestBody);
       
      
      fetch('http://10.0.2.2:4000/Careers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })
        .then(res => res.json())
        .then(responseData => {
          //dataAlert('API Response', responseData)
          dataAlert('Message', 'Job updated');
          // Reset state
          setPostName('');
          setDescription('');
          setNoOfPosts('');
          setDropDownVal('');
          setPostNameErr('');
          setNoOfPostsErr('');
        })
        .catch(error => {
          dataAlert(error.message);
          //dataAlert('API Error', error)
          setPostName('');
          setDescription('');
          setNoOfPosts('');
          setDropDownVal('');
          setPostNameErr('');
          setNoOfPostsErr('');
        });
    }
  }

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView> 
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Post Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPostName}
              value={postName}
              placeholder="Post Name"
              keyboardType="default"
            />
            <Text style={styles.errMsg}>{postNameErr}</Text>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Description</Text>
            <ScrollView>
            <TextInput
              style={styles.description}
              multiline={true}
              onChangeText={setDescription}
              value={description}
              placeholder="Description"
              keyboardType="default"
            /></ScrollView>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Number of posts</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNoOfPosts}
              value={noOfPosts}
              placeholder="No. of Posts"
              keyboardType="numeric"
            />
            <Text style={styles.errMsg}>{noOfPostsErr}</Text>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Job Type</Text>
            <Dropdown
              style={[styles.dropdown]}
              
              iconStyle={styles.iconStyle}
              data={dropdownData}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder={'Select item'}
              value={dropDownVal}
             
              onChange={item => {
                setDropDownVal(item.value);
                //setIsFocus(false);
              }}
              renderLeftIcon={() => (
                  <AntDesign
                      style={styles.icon}
                      name="Safety"
                      size={35}
                  />
              )}
            />
            <Text style={styles.errMsg}>{jobTypeErr}</Text>
          </View>

          <Button title="Add" color="purple"  onPress={handleSubmit} />
        </View>
        </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    flex: 4,
    backgroundColor: '#D7BDE2',
    padding: 5,
  },
  formField: {
    padding: 10,
  },
  label: {
    padding: 10,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
  },
  errMsg: {
    color: '#fc0303',
  },
  input: {
    borderWidth: 0.8,
    borderColor:'#000',
    width: 340,
    paddingLeft: 20,
  },
  description: {
    borderWidth: 0.8,
    width: 340,
    height: 70,
    paddingLeft: 20,
  },
  dropdown: {
    width: 350,
    height: 50,
    borderColor: 'gray',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CareerScreen1;
