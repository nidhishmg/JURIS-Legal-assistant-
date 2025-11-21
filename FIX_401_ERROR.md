# 🔧 Fixing "401 User not found" Error

## Problem
OpenRouter is rejecting your API key with a 401 error.

## Solutions

### Option 1: Get a New API Key (Recommended)

1. **Go to OpenRouter:**
   - Visit: https://openrouter.ai/keys
   
2. **Sign Up/Login:**
   - Create account or login
   
3. **Create New API Key:**
   - Click "Create Key"
   - Give it a name (e.g., "Legal Draft Generator")
   - Copy the key (starts with `sk-or-v1-...`)

4. **Update .env file:**
   ```bash
   VITE_OPENROUTER_API_KEY=your_new_key_here
   ```

5. **Restart dev server:**
   ```bash
   # Press Ctrl+C to stop, then:
   npm run dev
   ```

### Option 2: Check Current Key

Your current key in `.env`:
```
sk-or-v1-b7e75c9c82b496559f2508c745e5354a58a9f3f7c8cf3d205f82687a8c09eb00S
```

This key might be:
- ❌ Invalid/expired
- ❌ From a different service
- ❌ Not properly configured in OpenRouter

### Option 3: Add Credits to OpenRouter

Even with a valid key, OpenRouter requires credits:

1. Go to: https://openrouter.ai/credits
2. Add credits ($5 minimum recommended)
3. The 401 error can occur if account has no credits

## Testing Your Fix

After updating the API key and restarting:

1. Open browser console (F12)
2. Try generating a draft
3. Check for console logs:
   ```
   API Key configured: Yes
   API Key length: [should be ~90+ characters]
   Calling OpenRouter API with model: x-ai/grok-beta
   ```

## Common Issues

### "API Key configured: No"
- .env file not in project root
- Need to restart dev server
- Typo in variable name (must be exactly `VITE_OPENROUTER_API_KEY`)

### "Invalid API key"
- Get new key from https://openrouter.ai/keys
- Make sure to copy entire key
- No extra spaces before/after key in .env

### Still getting 401
- Add credits to your OpenRouter account
- Verify account is active
- Check OpenRouter dashboard for API status

## Need Help?

1. Check OpenRouter docs: https://openrouter.ai/docs
2. Verify account status: https://openrouter.ai/activity
3. Check credits: https://openrouter.ai/credits
