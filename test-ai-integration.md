# 🧪 Testing AI Integration

## How to Test the Secure AI Integration

### 1. **Start the Development Server**
```bash
npm run dev
```

### 2. **Test Without API Key (Mock Mode)**
1. Open the app in your browser
2. Click "Generate logic" button
3. Should work with mock data (no API key needed)
4. Check console for "AI Generated Logic" messages

### 3. **Test API Key Management**
1. Click "Settings" button in header
2. Go to "API Keys" tab
3. Try entering an invalid API key (should show validation error)
4. Enter a valid OpenAI API key (starts with `sk-`)
5. Should store securely and show success message

### 4. **Test Privacy Controls**
1. In Settings dialog, go to "Privacy" tab
2. Toggle privacy settings (analytics, performance, error tracking)
3. Test "Export My Data" button (should download JSON file)
4. Test "Delete All Data" button (should clear all data)

### 5. **Test AI Generation with Real API**
1. Set a valid OpenAI API key in Settings
2. Enter some text in the logic summary area
3. Click "Generate logic" button
4. Should make real API call and show success message
5. Check browser network tab for API calls

### 6. **Test Security Features**
1. Check browser DevTools > Application > Local Storage
2. Look for encrypted data (should be base64 encoded)
3. API keys should be encrypted, not stored in plain text
4. Test clearing browser data - should remove all encrypted data

## Expected Behavior

### ✅ **Mock Mode (No API Key)**
- Generate logic button works with mock data
- No API calls made
- Console shows "AI Generated Logic" with mock structure
- App functions normally

### ✅ **Real API Mode (With API Key)**
- Generate logic button makes real API calls
- Loading states show during generation
- Success/error messages display appropriately
- API key is validated and tested before use

### ✅ **Security Features**
- API keys are encrypted in localStorage
- Input sanitization prevents injection attacks
- Privacy controls work as expected
- Data export/deletion functions properly

### ✅ **Error Handling**
- Invalid API keys show validation errors
- Network failures fall back to mock data
- Loading states prevent multiple requests
- Error messages are user-friendly

## Troubleshooting

### **Build Errors**
If you see missing component errors:
```bash
npm install @radix-ui/react-switch @radix-ui/react-alert-dialog
```

### **API Key Issues**
- Make sure API key starts with `sk-` for OpenAI
- Check API key has proper permissions
- Verify network connectivity

### **Privacy Issues**
- Check browser console for encryption errors
- Verify localStorage permissions
- Test data export/deletion functions

## Security Verification

### **Encryption Check**
1. Open DevTools > Application > Local Storage
2. Look for keys starting with `promptboard_`
3. Values should be encrypted JSON with `encrypted`, `iv`, `salt` fields
4. No plain text API keys should be visible

### **Network Security**
1. Open DevTools > Network tab
2. Make API calls
3. Verify HTTPS connections only
4. Check request headers for proper authentication

### **Privacy Compliance**
1. Test data export functionality
2. Verify data deletion works completely
3. Check consent management
4. Verify anonymization options

## Performance Testing

### **Caching**
- First API call should be slower
- Subsequent calls should be faster (cached)
- Check localStorage for cached responses

### **Error Recovery**
- Disconnect internet and test
- Should fall back to mock data gracefully
- No crashes or broken states

## Integration Testing

### **UI Integration**
- Settings dialog opens/closes properly
- Tabs switch between API Keys and Privacy
- Loading states show during operations
- Success/error messages display correctly

### **State Management**
- API key status updates correctly
- Privacy settings persist across sessions
- Generate logic button state updates properly
- Loading states prevent multiple operations

This comprehensive testing approach ensures the AI integration is secure, functional, and user-friendly! 🚀
