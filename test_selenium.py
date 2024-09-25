pip install selenium

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    driver.get("http://your-website-url.com")  

    time.sleep(5) 

    title = driver.title

    if title:
        print(f"Deployment successful! The page title is: {title}")
    else:
        print("Test failed: No title found. Deployment might have failed.")

except Exception as e:
    print(f"Test failed due to error: {str(e)}")

finally:
    driver.quit()