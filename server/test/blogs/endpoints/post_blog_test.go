package endpoints

import (
	"gin/test/blogs"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPostSuccess(t *testing.T) {
	router := blogs.SetupTest()

	w := httptest.NewRecorder()

	requestBody := `{
		"Title": "Second blog Post",
		"Subtitle": "One more test",
		"DateCreated": "2025-09-16T10:00:00Z",
		"DateUpdated": "2025-09-16T10:00:00Z",
		"Keywords": [
			"go"
		],
		"Content": "Just a quick test to make sure."
	}`
	bodyReader := strings.NewReader(requestBody)

	req, _ := http.NewRequest("POST", "/blog", bodyReader)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPostBadRequest(t *testing.T) {
	router := blogs.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/blog", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestPostServerError(t *testing.T) {
	router := blogs.SetupErrorTest()

	w := httptest.NewRecorder()

	requestBody := `{
		"Title": "Second blog Post",
		"Subtitle": "One more test",
		"DateCreated": "2025-09-16T10:00:00Z",
		"DateUpdated": "2025-09-16T10:00:00Z",
		"Keywords": [
			"go"
		],
		"Content": "Just a quick test to make sure."
	}`
	bodyReader := strings.NewReader(requestBody)

	req, _ := http.NewRequest("POST", "/blog", bodyReader)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
}
