# Railway Deployment Guide for Gemma 2B

## Step 1: Deploy Gemma 2B on Railway

### 1.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub account
3. Create a new project

### 1.2 Deploy the Model
1. **Option A: Deploy from GitHub**
   - Fork this repository or create a new one with the `railway-gemma/` files
   - In Railway, click "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect the Dockerfile

2. **Option B: Deploy from Local Files**
   - In Railway, click "Deploy from local files"
   - Upload the `railway-gemma/` directory
   - Railway will build and deploy

### 1.3 Monitor Deployment
- Watch the build logs
- The model will download (~2-5 minutes)
- Wait for "Model loaded successfully!" message
- Note the public URL provided by Railway

### 1.4 Test the Deployment
```bash
# Test health endpoint
curl https://your-railway-url.railway.app/health

# Test generation endpoint
curl -X POST https://your-railway-url.railway.app/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, how are you?", "max_length": 100}'
```

## Step 2: Update MBOS Dashboard

### 2.1 Add Environment Variable
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `RAILWAY_GEMMA_URL=https://your-railway-url.railway.app`

### 2.2 Deploy Updated Dashboard
The updated code includes:
- Railway endpoint integration
- Toggle to switch between OpenRouter and Railway
- Enhanced error handling

## Step 3: Test Integration

### 3.1 Test via Dashboard
1. Go to your MBOS Dashboard
2. Check "Use Railway Gemma 2B (Experimental)"
3. Enter a prompt
4. Click Generate
5. Check console for logs

### 3.2 Monitor Performance
- Check processing time
- Compare quality with OpenRouter
- Monitor Railway logs for any issues

## Troubleshooting

### Model Loading Issues
- Check Railway logs for memory/CPU constraints
- Ensure sufficient resources allocated
- Restart deployment if needed

### API Connection Issues
- Verify Railway URL is correct
- Check CORS settings
- Test endpoint directly

### Performance Issues
- Monitor Railway resource usage
- Consider upgrading Railway plan if needed
- Optimize model parameters

## Cost Considerations

### Railway Pricing
- Free tier: Limited resources
- Pro plan: $5/month for better performance
- Model size: ~4GB RAM required

### Optimization Tips
- Use model quantization for smaller memory footprint
- Implement caching for repeated requests
- Consider model fine-tuning for specific use cases

## Next Steps

1. **Fine-tune the Model**: Train on your specific domain
2. **Add Caching**: Implement response caching
3. **Monitor Usage**: Track API calls and performance
4. **Scale Up**: Add more models or endpoints

## Support

- Railway Documentation: https://docs.railway.app
- FastAPI Documentation: https://fastapi.tiangolo.com
- Transformers Documentation: https://huggingface.co/docs/transformers 