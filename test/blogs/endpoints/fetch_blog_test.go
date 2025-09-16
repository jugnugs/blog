package endpoints

import (
	"gin/test/blogs"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFetchSuccess(t *testing.T) {
	router := blogs.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/blog/2222222", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestNotFound(t *testing.T) {
	router := blogs.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/blog/123456", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestFetchServerError(t *testing.T) {
	router := blogs.SetupErrorTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/blog/2222222", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
}
