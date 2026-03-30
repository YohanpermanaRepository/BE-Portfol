$headers = @{
    'Content-Type' = 'application/json'
}

# Step 1: Login untuk dapatkan token
Write-Host "Step 1: Logging in untuk dapatkan auth token..." -ForegroundColor Yellow

$loginBody = @{
    username = 'admin'
    password = 'admin123'
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' `
        -Method Post `
        -Headers $headers `
        -Body $loginBody
    
    $token = $loginResponse.token
    Write-Host "✅ Login berhasil! Token: $($token.Substring(0, 20))..." -ForegroundColor Green
    
    # Add authorization header
    $authHeaders = @{
        'Content-Type' = 'application/json'
        'Authorization' = "Bearer $token"
    }
} catch {
    Write-Host "❌ Login failed: $_" -ForegroundColor Red
    exit
}

# Step 2: Test GET list
Write-Host "`nStep 2: GET /api/experience (list semua)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/experience' `
        -Method Get
    
    Write-Host "✅ Success! Found $($response.Count) experiences" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

# Step 3: Test GET detail
Write-Host "`nStep 3: GET /api/experience/1 (detail dengan images & projects)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/experience/1' `
        -Method Get
    
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "Company: $($response.company)"
    Write-Host "Position: $($response.position)"
    Write-Host "Images: $($response.images.Count)"
    Write-Host "Related Projects: $($response.projects.Count)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

# Step 4: Test POST image
Write-Host "`nStep 4: POST /api/experience/1/images (add image)..." -ForegroundColor Cyan

$imageBody = @{
    imageUrl = 'https://via.placeholder.com/800x600?text=Experience+Screenshot'
    caption = 'Coding Camp mentoring session'
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/experience/1/images' `
        -Method Post `
        -Headers $authHeaders `
        -Body $imageBody
    
    $imageId = $response.id
    Write-Host "✅ Image added! ID: $imageId" -ForegroundColor Green
    Write-Host "Caption: $($response.caption)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

# Step 5: Test GET images
Write-Host "`nStep 5: GET /api/experience/1/images (list images)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/experience/1/images' `
        -Method Get
    
    Write-Host "✅ Success! Found $($response.Count) images" -ForegroundColor Green
    if ($response.Count -gt 0) {
        $response | ForEach-Object {
            Write-Host "  - ID: $($_.id), Caption: $($_.caption)"
        }
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

# Step 6: Test PUT image
Write-Host "`nStep 6: PUT /api/experience/1/images/$imageId (update image)..." -ForegroundColor Cyan

$updateImageBody = @{
    caption = 'Updated: Coding Camp mentoring session - Batch 6'
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/experience/1/images/$imageId" `
        -Method Put `
        -Headers $authHeaders `
        -Body $updateImageBody
    
    Write-Host "✅ Image updated!" -ForegroundColor Green
    Write-Host "New Caption: $($response.caption)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

# Step 7: Test final GET detail
Write-Host "`nStep 7: GET /api/experience/1 (verify semua data)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/experience/1' `
        -Method Get
    
    Write-Host "✅ Final verification:" -ForegroundColor Green
    Write-Host "Company: $($response.company)"
    Write-Host "Images: $($response.images.Count)"
    Write-Host "Projects: $($response.projects.Count)"
    Write-Host "Certification: $($response.certification.name)"
    
    if ($response.images.Count -gt 0) {
        Write-Host "`n  Images:" -ForegroundColor Magenta
        $response.images | ForEach-Object {
            Write-Host "    - ID: $($_.id), Caption: $($_.caption)"
        }
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host "`n✨ API Testing Complete!" -ForegroundColor Green
