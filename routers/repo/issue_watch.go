package repo

import (
	"fmt"
	"net/http"
	"strconv"

	"code.gitea.io/gitea/models"
	"code.gitea.io/gitea/modules/context"
)

// IssueWatch sets issue watching
func IssueWatch(c *context.Context) {
	watch, err := strconv.ParseBool(c.Req.PostForm.Get("watch"))
	if err != nil {
		c.Handle(http.StatusInternalServerError, "watch is not bool", err)
		return
	}
	issueID := c.ParamsInt64("index")

	if err := models.CreateOrUpdateIssueWatch(c.User.ID, issueID, watch); err != nil {
		c.Handle(http.StatusInternalServerError, "CreateOrUpdateIssueWatch", err)
		return
	}

	url := fmt.Sprintf("%s/issues/%d", c.Repo.RepoLink, issueID)
	c.Redirect(url, http.StatusSeeOther)
}
