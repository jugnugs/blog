package endpoints

import (
	"gin/test/blogs"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetSuccess(t *testing.T) {
	router := blogs.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/blog", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetServerError(t *testing.T) {
	router := blogs.SetupErrorTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/blog", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
}
