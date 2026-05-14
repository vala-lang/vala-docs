# NTP client (Posix UDP)

Minimal [NTP](https://www.ntp.org/) client over UDP using only the Posix VAPI
(`--pkg posix`): `Posix.getaddrinfo` for host and port lookup (IPv4 and IPv6),
UDP `socket` / `connect` / `read` / `write`, byte order on the transmit timestamp,
and `Posix.ctime` / `time_t` for printing.

The service name `"123"` is passed to `getaddrinfo` so the port does not need
to be filled in by hand. `Posix.getnameinfo` prints the numeric address that was
actually used. Always call `Posix.freeaddrinfo` on the result list.

## Program

Save as `ntp-client.vala`:

```vala
struct NtpPacket {
    uint8 li_vn_mode;
    uint8 stratum;
    uint8 poll;
    uint8 precision;
    uint32 root_delay;
    uint32 root_dispersion;
    uint32 ref_id;
    uint32 ref_tm_s;
    uint32 ref_tm_f;
    uint32 orig_tm_s;
    uint32 orig_tm_f;
    uint32 rx_tm_s;
    uint32 rx_tm_f;
    uint32 tx_tm_s;
    uint32 tx_tm_f;
}

int main () {
    const string HOSTNAME = "pool.ntp.org";
    Posix.AddrInfo hints = Posix.AddrInfo ();
    hints.ai_family = Posix.AF_UNSPEC;
    hints.ai_socktype = Posix.SOCK_DGRAM;
    hints.ai_protocol = Posix.IPProto.UDP;

    Posix.AddrInfo* res;
    int gai = Posix.getaddrinfo (HOSTNAME, "123", hints, out res);
    if (gai != 0) {
        stderr.printf ("getaddrinfo: %s\n", Posix.gai_strerror (gai));
        return 1;
    }

    int sockfd = -1;
    unowned Posix.AddrInfo* chosen = null;
    for (unowned Posix.AddrInfo* ai = res; ai != null; ai = ai.ai_next) {
        int fd = Posix.socket (ai.ai_family, ai.ai_socktype, ai.ai_protocol);
        if (fd < 0) {
            continue;
        }
        if (Posix.connect (fd, ai.ai_addr, (Posix.socklen_t) ai.ai_addrlen) == 0) {
            sockfd = fd;
            chosen = ai;
            break;
        }
        Posix.close (fd);
    }

    if (sockfd < 0 || chosen == null) {
        stderr.printf ("Could not connect to any resolved address\n");
        Posix.freeaddrinfo (res);
        return 1;
    }

    var hostbuf = new char[256];
    var servbuf = new char[64];
    if (Posix.getnameinfo (*chosen.ai_addr, (Posix.socklen_t) chosen.ai_addrlen,
            hostbuf, servbuf, Posix.NI_NUMERICHOST | Posix.NI_NUMERICSERV) == 0) {
        stderr.printf ("Using %s port %s\n", (string) hostbuf, (string) servbuf);
    }

    var packet = NtpPacket ();
    assert (sizeof (NtpPacket) == 48);
    packet.li_vn_mode = 0x1b;

    if (Posix.write (sockfd, &packet, sizeof (NtpPacket)) < 0) {
        stderr.printf ("Can't send UDP packet: errno %d\n", Posix.errno);
        Posix.close (sockfd);
        Posix.freeaddrinfo (res);
        return 1;
    }

    if (Posix.read (sockfd, &packet, sizeof (NtpPacket)) < 0) {
        stderr.printf ("Can't read from socket: errno %d\n", Posix.errno);
        Posix.close (sockfd);
        Posix.freeaddrinfo (res);
        return 1;
    }
    Posix.close (sockfd);
    Posix.freeaddrinfo (res);

    packet.tx_tm_s = Posix.ntohl (packet.tx_tm_s);
    packet.tx_tm_f = Posix.ntohl (packet.tx_tm_f);
    const uint64 NTP_TIMESTAMP_DELTA = 2208988800ULL;
    time_t tx_tm = (time_t) ((int64) packet.tx_tm_s - (int64) NTP_TIMESTAMP_DELTA);
    unowned string? utc_str = Posix.ctime (ref tx_tm);
    stdout.printf ("Current UTC time is %s", utc_str ?? "unknown\n");
    return 0;
}
```

## Compile and run

```shell
valac --pkg posix ntp-client.vala
./ntp-client
```

`Posix.ctime` returns a libc-formatted string (usually including a trailing newline).
Outbound UDP to port 123 must be allowed. The program prints diagnostics on
`stderr` and the time string on `stdout`.
