Add-Type -AssemblyName System.Drawing

function Compress-Jpeg {
    param (
        [string]$Path,
        [int]$Quality = 75
    )
    Write-Host "Compressing JPEG: $Path"
    try {
        $img = [System.Drawing.Image]::FromFile($Path)
        
        # Determine if we should resize (e.g., if width > 1920)
        $width = $img.Width
        $height = $img.Height
        if ($width -gt 1920) {
            $newWidth = 1920
            $newHeight = [int]($height * (1920 / $width))
            Write-Host "  Resizing from $($width)x$($height) to $($newWidth)x$($newHeight)"
            $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            $g.Dispose()
            $img.Dispose()
            $img = $newImg
        }

        # Setup JPEG encoder parameters
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $Quality)
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
        
        # Temp path
        $tempPath = $Path + ".tmp"
        $img.Save($tempPath, $codec, $encoderParams)
        $img.Dispose()

        # Replace original file
        Remove-Item $Path -Force
        Rename-Item $tempPath (Split-Path $Path -Leaf) -Force
        
        $newSize = (Get-Item $Path).Length
        Write-Host "  Finished. New size: $($newSize / 1KB) KB"
    } catch {
        Write-Error "  Failed to compress $($Path): $_"
    }
}

function Compress-Png {
    param (
        [string]$Path,
        [int]$MaxWidth = 1000
    )
    Write-Host "Compressing PNG: $Path"
    try {
        $img = [System.Drawing.Image]::FromFile($Path)
        $width = $img.Width
        $height = $img.Height
        
        if ($width -gt $MaxWidth) {
            $newWidth = $MaxWidth
            $newHeight = [int]($height * ($MaxWidth / $width))
            Write-Host "  Resizing from $($width)x$($height) to $($newWidth)x$($newHeight)"
            $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            $g.Dispose()
            $img.Dispose()
            $img = $newImg
        }
        
        $tempPath = $Path + ".tmp"
        $img.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()

        Remove-Item $Path -Force
        Rename-Item $tempPath (Split-Path $Path -Leaf) -Force
        
        $newSize = (Get-Item $Path).Length
        Write-Host "  Finished. New size: $($newSize / 1KB) KB"
    } catch {
        Write-Error "  Failed to compress $($Path): $_"
    }
}

# Compress JPEGs > 300KB
Get-ChildItem -Path "public" -Recurse -Include *.jpg, *.jpeg | Where-Object { $_.Length -gt 300KB } | ForEach-Object {
    Compress-Jpeg -Path $_.FullName -Quality 75
}

# Compress PNGs > 1MB
Get-ChildItem -Path "public" -Recurse -Include *.png | Where-Object { $_.Length -gt 1MB } | ForEach-Object {
    Compress-Png -Path $_.FullName -MaxWidth 1000
}
