// module for CSP logic

// start of range, end of range
function backtrack(tracks, start, end) {
    stack = [[[], 0]]; // [partial playlist, curr length]

    while stack {
        [curr_tracks, curr_len] = stack.pop();

        // terminal state check
        if curr_len > start && curr_len <= end {
            return curr_tracks; // returning an array of valid tracks
        }

        // BFS way of adding new tracks
        for (new_track let of tracks) {
            len = new_track["duration_ms"]; // @TODO: check this later

            // do checks
            if (!(new_track in curr_tracks)) && within_range(curr_len, len, end) && no_triple_artist(curr_tracks, new_track) {
                new_tracks = curr_tracks + new_track;
                new_len = curr_len + len;

                stack.append([new_tracks, new_len]);
            }
        }
    }
}

// time length constraint
function within_range(curr_len, new_len, end) {
    return curr_len <= end;
}

// artist constraint
function no_triple_artist(curr_tracks, new_track) {
    if curr_tracks.length() >= 2 {
        // @TODO: may need to change this given spotify API
        return curr_tracks[-2]["artist"] == new_track["artist"] && curr_tracks[-1]["artist"] == new_track["artist"];
    }

    return true;
}
